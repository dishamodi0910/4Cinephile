"use client";
import React, { useCallback, useEffect, useState } from "react";
import CardWrapper from "@/components/auth/CardWrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newUserEmailVerification } from "@/actions/newUserEmailVerification";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
const NewVerificationForm = () => {
    
    const [success,setSuccess] = useState<string | undefined>()
    const [error,setError] = useState<string | undefined>()
    const params = useSearchParams();
  //  console.log("Params are : ",params);
    let token = params.get("token");

    // const onSubmit  = useCallback(()=>{
    //     // if(!token)
    //     // {
    //     //     setError("Missing Token");
    //     //     return;
    //     // }
    //     // newUserEmailVerification(token).then((data)=>{
    //     //     setError(data.error)
    //     //     setSuccess(data.success)
    //     // }).catch(()=>{
    //     //     setError("Something went wrong!")
    //     // });
    // },[token]);

    useEffect(()=>{
      let token = params.get("token");
      if(!token)
      {
          setError("Missing Token");
          return;
      }
      newUserEmailVerification(token).then((data)=>{
          setError(data.error)
          setSuccess(data.success)
      }).catch(()=>{
          setError("Something went wrong!")
      });
    },[token])

  return (
    <div className="flex items-center h-full w-full justify-center">
      <CardWrapper
        formHeader={"Verifying your email"}
        backButtonLabel={"Back to Login"}
        backButtonHref={"/auth/login"}
      >
        <div className="flex items-center w-full justify-center">
            {
                !success && !error && (
                    <BeatLoader />
                )
            }
     
          <FormSuccess message={success}/>
          <FormError message={error}/>
        </div>
      </CardWrapper>
    </div>
  );
};

export default NewVerificationForm;
