import { downloadVideo } from '@/services/youtube';
import { Queue, Worker, QueueEvents } from 'bullmq';

const queue = new Queue('KaraokeOKE');
export const queueEvents = new QueueEvents('KaraokeOKE');



const worker = new Worker('KaraokeOKE', async job => {
    if (job.name === 'generateAndUpload') {
/*        const { videoId, track } = job.data;
        await downloadVideo(videoId)*/
    }
});

