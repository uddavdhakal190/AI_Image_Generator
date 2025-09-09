import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormField, Loader } from '../components';
import { getRandomPrompt } from '../utils';
import { preview } from '../assets';

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', prompt: '', photo: '' });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (!form.prompt) {
      alert('Please provide a proper prompt');
      return;
    }

    try {
      setGeneratingImg(true);

      // Generate image from backend
      const response = await fetch('/api/v1/dalle/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: form.prompt }),
      });

      // Safely parse response: handle empty/non-JSON bodies to avoid
      // "Unexpected end of JSON input" when proxy/server returns no JSON
      let data = {};
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        data = await response.json().catch(() => ({}));
      } else {
        const text = await response.text().catch(() => '');
        try {
          data = text ? JSON.parse(text) : {};
        } catch (_) {
          data = { message: text };
        }
      }

      if (!response.ok) {
        console.error('Generation API error:', {
          status: response.status,
          error: data?.error,
          message: data?.message,
        });
        throw new Error(
          data?.message || data?.error || `Failed to generate image (status ${response.status})`
        );
      }

      if (!data || !data.photo) {
        throw new Error(data?.message || 'No image received from generation API');
      }

      setForm((prev) => ({ ...prev, photo: data.photo }));
    } catch (err) {
      console.error('Error generating image:', err);
      alert(err.message || 'Failed to generate image');
    } finally {
      setGeneratingImg(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.prompt || !form.photo) {
      alert('Please enter your name, a prompt, and generate an image first.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/v1/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        console.error('Create post failed:', response.status, data);
        throw new Error(data?.message || 'Failed to share the image');
      }

      navigate('/');
    } catch (err) {
      console.error('Error creating post:', err);
      alert(err.message || 'Failed to share the image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="section-title">Create</h1>
        <p className="section-subtitle max-w-[600px]">
          Generate an imaginative image and share it with the community.
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative card-base text-gray-900 text-sm w-[18rem] p-3 h-[18rem] flex justify-center items-center overflow-hidden">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-black/40 rounded-xl">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="btn-secondary w-full sm:w-auto"
            disabled={generatingImg}
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">Once you have created the image you want, you can share it with others in the community.</p>
          <button
            type="submit"
            className="mt-3 btn-primary w-full sm:w-auto"
            disabled={loading}
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;