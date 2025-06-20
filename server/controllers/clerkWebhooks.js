import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try{
        // Create a svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        
        //getting headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };
         console.log("Headers:", headers);
         console.log("Raw body:", JSON.stringify(req.body, null, 2));
        //verifying headers
        // await whook.verify(JSON.stringify(req.body),headers)
        // const payload = JSON.parse(req.body.toString());
        //getting data from request body

        // const {data,type} = payload;
        const payload = req.body.toString();
        const evt = await whook.verify(payload, headers);
        const { data, type } = evt;

        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            image: data.image_url,
            recentSearchedCities: []
        };

    console.log(`Event type: ${type}`);
    console.log(` User data to insert/update:`, userData);


        //switch cases for different events
        switch (type) {
            case "user.created":{
                await User.create(userData);
                console.log("User created");
                break;
            }
            
            case "user.updated":{
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }

            case "user.deleted":{
                await User.findByIdAndDelete(data.id);
                break;
            }

            default:
                console.log(" Unknown event type");
                break;
        }
        res.status(200).json({ success: true, message: "Webhook received" });
    }catch(error){
        console.log("error in webhook",error.message);
        res.json({success: false, message: error.message});
    }
}

export default clerkWebhooks;