// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { auth } from '@clerk/nextjs/server';

const f = createUploadthing();

export const ourFileRouter = {
  projectFile: f({ image: { maxFileSize: '32MB' }, pdf: { maxFileSize: '1GB' } })
    .middleware(async () => {
      const { userId } = await auth();
      if (!userId) throw new Error('Unauthorized');
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file, metadata: { userId } }) => {
      
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
