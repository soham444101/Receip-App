import { Receip } from "../model/Receip_Model.js";



const CreateReceip = async (req, res) => {
    const { title, description, difficulty } = req.body;
    console.log('====================================');
    console.log("Title ,description ,difficulty come in controller", title, description, difficulty);
    console.log('====================================');
   try {
    if (!title && !difficulty) {
        return res.status(404)
            .json(
                {
                    success: false,
                    status: 404,
                    message: "Title  Is Missing"
                }
            )
    }
    if (!description) {
        return res.status(404)
            .json(
                {
                    success: false,
                    status: 404,
                    message: "Description Is Missing"
                }
            )
    }
    console.log("Before Receip Creation");
    console.log("User Coming From Auth",req.user);
    console.log("Id Come From Authe",req.user.id);
    const userId = req.user.id; 
    const newreceip = await Receip.create(
        {
            title,
            description,
            difficulty,
            user: userId
        }
    );

    if (!newreceip) {
        return res.status(404)
            .json(
                {
                    success: false,
                    status: 404,
                    message: "Creation of the new receip fail due to DB"
                }
            )
    }
    console.log('====================================');
    console.log("Receip created", newreceip);
    console.log('====================================');

    return res.status(200)
        .json(
            {
                status: 200,
                success: true,
                message: "New receip is created"
            }
        )
   } catch (error) {
    return res.status(404)
    .json(
        {
            success: false,
            status: 404,
            message: "Already This Receip is Created"
            ,isExist:true
        }
    )
   }
}

const AllreceipData = async (req, res) => {

    try {
        const allReceipData = await Receip.find({})
        console.log('====================================');
        console.log("Get The Whole Data", JSON.stringify(allReceipData,null,2));
        console.log('====================================');

        if (!allReceipData) {
            return res.status(204)
                .json(
                    {
                        success: false,
                        message: "No Data Is Present"
                    }
                )

        }
        return res.status(200)
        .json(
            {
                success: true,
                message: "Data Fetch Successfull",
                data:allReceipData
            }
        )
    } catch (error) {
        return res.status(404)
        .json(
            {
                success: false,
                message: "Db Data Getting Problem"
            }
        )
    
    }
}

const DeleatReceip=async (req,res) => {
    console.log('====================================');
    console.log("Delete In Delete Controller");
    console.log('====================================');
const{id} = req.query;

console.log("ID In Pharams",id);
// console.log("Data In Pharams",data);

if (!id) {
    return res
    .status(405)
    .json(
        {
            success:false,
            message:"Id Not Get pRoperly"
        }
    )  
}
console.log("Requeset Start");

const receipExist =await Receip.deleteOne({_id:id});
console.log('====================================');
console.log("Requeset End");
console.log('====================================');
if (!receipExist) {
    return res
    .status(406)
    .json(
        {
            success:false,
            message:"Receips Not Find in Db "
        }
    )  
} 
console.log('====================================');
console.log("Delete Successful Receip");
console.log('====================================');
return res.
status(200)
.json(
    {
        success:true,
        message:"Receip Delete Successfuly"
    }
)
    
}


export {
    CreateReceip,
    AllreceipData,
    DeleatReceip
}