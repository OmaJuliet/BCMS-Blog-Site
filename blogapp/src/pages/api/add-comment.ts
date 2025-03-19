import { bcms } from "../../bcms-client";
import type { CommentEntry } from "../../../bcms/types/ts";

export async function GET(req:any, res:any){
    try{
        const blogs = (await bcms.entry.getAll("comment")) as CommentEntry[];
        return res.status(200).json({success:true, data:blogs});
    } catch(error){
        console.error('Error in retrieving blogs:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export async function POST(req: { body: { display_name: any; comment_text: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: string; }): any; new(): any; }; }; }) {
    try {
        const { display_name, comment_text } = req.body;

        if (!display_name || !comment_text) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Create the new comment entry
        const newComment = await bcms.entry.create('comment', {
            meta: [{ lng: 'en', data: { display_name: "Oma", comment_text: "I love this!" } }],
            statuses: [],
            content: [],
        });

        if (newComment) {
            return res.status(200).json({ success: true, message: 'Comment added successfully' });
        }

        return res.status(500).json({ success: false, message: 'Failed to add comment' });
    } catch (error) {
        console.error('Error in adding comment:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
