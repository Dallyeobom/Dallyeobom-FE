import { AgreementsSchema, AgreementsSchemaParams, ProcessAgreementSchema, } from "@/types/auth";

export const processAgreementData = (data: AgreementsSchema[]) =>   {
     const result = data.map((item )=> {
        const newItem = {
            ...item,
            isCheck:false
        }

         return newItem
     })

     return [{"id":1, "isCheck": false, "name": "약관 전체 동의", "required":false,
        "seq":0, "type": "all"
     }, ...result]
}

;


export const processTermsData = (data: ProcessAgreementSchema[]) => {

   return  data.reduce<AgreementsSchemaParams[]>((acc, item, index)=> {
            const {id, type, isCheck} = item;
            if(type === "all"){
                return acc
            }
            const newItem = {
                id: id,
                termsType: type,
                agreed: isCheck,
            }
            acc = [...acc, newItem]
            return acc
    }, [])


}
