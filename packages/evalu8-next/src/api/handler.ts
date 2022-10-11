import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "PATCH": {
      }
      default: {
        return res.status(405).end(`Method ${req.method} Not Allowed.`);
      }
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
