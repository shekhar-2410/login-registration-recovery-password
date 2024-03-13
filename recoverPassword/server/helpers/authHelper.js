import bcrypt from "bcrypt"

export const hasPassword = async(password)=>{
    try{
        const saltRounds= 10;
        const hasedPassword = await bcrypt.hash(password,saltRounds)
        return hasedPassword
    }catch (error){
        console.log(error)
    }
};

export const comparePassword = async (password,hasedPassword)=>{
    return bcrypt.compare(password,hasedPassword)
}