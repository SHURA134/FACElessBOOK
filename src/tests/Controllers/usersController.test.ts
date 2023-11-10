import request from "supertest";
import {describe,expect,it} from "@jest/globals";
import {app} from "../../index";


describe("userController", ()=>{
    it('Should correctly return users from external api', async()=>{
        const response = await request(app)
            .post("/users/registration")
            .send({login : "ustimk1", password : 123, name: "Jenya", last_name : "Ustimov" , age: "26", avatar_link: "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcTlFppQFm4VCK-UlCGwBXMWBW1BSM0v_KDxVwXZgEO-4slA_Bq23-4OUg_Lg2ONXc2D" })
        expect(response).toEqual(true);
    })



})