'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

export async function getPosts(): Promise<Post[]> {
  try {
    if (!fs.existsSync(postsDirectory)) {
        console.log('Blog directory not found, returning empty array.');
        return [];
    }
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
        .filter(fileName => fileName.endsWith('.md')) // Ensure we only process markdown files
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            try {
                const fileContents = fs.readFileSync(fullPath, 'utf8');
                const matterResult = matter(fileContents);

                return {
                    slug,
                    title: matterResult.data.title || 'Untitled Post',
                    date: matterResult.data.date || new Date().toISOString(),
                    excerpt: matterResult.data.excerpt || '',
                    content: matterResult.content || '',
                };
            } catch (mapError) {
                console.error(`Error processing post file ${fileName}:`, mapError);
                return null; // Return null for files that fail to parse
            }
    });

    // Filter out any nulls from failed file reads and sort
    return allPostsData
        .filter((post): post is Post => post !== null)
        .sort((a, b) => {
            try {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                // Handle invalid dates
                if (isNaN(dateA)) return 1;
                if (isNaN(dateB)) return -1;
                return dateB - dateA; // Sort descending
            } catch {
                return 0;
            }
    });
  } catch (error) {
    // Broad catch for directory reading errors
    console.error('Error reading posts directory:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
        return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title || 'Untitled Post',
      date: matterResult.data.date || new Date().toISOString(),
      excerpt: matterResult.data.excerpt || '',
      content: matterResult.content || '',
    };
  } catch (error) {
    console.error(`Error reading post with slug "${slug}":`, error);
    return null;
  }
}
