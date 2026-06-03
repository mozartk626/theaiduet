import satori from 'satori';
import sharp from 'sharp';
import { getCollection } from 'astro:content';
import fs from 'node:fs';
import path from 'node:path';

// Load font at module level
const DM_SANS_REGULAR = fs.readFileSync(
  path.resolve('node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff')
).buffer;

const DM_SANS_BOLD = fs.readFileSync(
  path.resolve('node_modules/@fontsource/dm-sans/files/dm-sans-latin-700-normal.woff')
).buffer;

export async function getStaticPaths() {
  const posts = await getCollection('posts');

  const paths = posts.map((post) => ({
    params: { title: post.data.title },
    props: { title: post.data.title, type: post.data.episode ? 'podcast' : 'article' },
  }));

  // Add a default one for the homepage
  paths.push({
    params: { title: 'The AI Duet' },
    props: { title: 'The AI Duet', type: 'home' },
  });

  return paths;
}

export async function GET({ props }) {
  const { title, type } = props;

  const typeLabel = type === 'podcast' ? '🎙 Podcast' : type === 'home' ? '' : 'Article';

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          backgroundColor: '#faf9f7',
          fontFamily: 'DM Sans',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column', gap: '16px' },
              children: [
                typeLabel ? {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '18px',
                      fontWeight: 400,
                      color: '#c4491a',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    },
                    children: typeLabel,
                  },
                } : null,
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: title.length > 60 ? '42px' : '52px',
                      fontWeight: 700,
                      color: '#1a1a1a',
                      lineHeight: 1.2,
                      maxWidth: '900px',
                    },
                    children: title,
                  },
                },
              ].filter(Boolean),
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '22px',
                      fontWeight: 700,
                      color: '#1a1a1a',
                      display: 'flex',
                      gap: '6px',
                    },
                    children: [
                      { type: 'span', props: { children: 'The AI ' } },
                      { type: 'span', props: { style: { color: '#c4491a' }, children: 'Duet' } },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '16px',
                      color: '#8c8577',
                    },
                    children: 'theaiduet.com',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'DM Sans', data: DM_SANS_REGULAR, weight: 400 },
        { name: 'DM Sans', data: DM_SANS_BOLD, weight: 700 },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
}
