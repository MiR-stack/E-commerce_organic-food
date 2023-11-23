"use client";
import {
  redirect,
  useParams,
  useSearchParams,
  useRouter,
} from "next/navigation";
import { useEffect, useState } from "react";
import {
  handleClose,
  handleError,
  handleOpen,
  handleToken,
} from "../../../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

//TODO: complete this functionality using nextjs api route

function Redirect() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { route } = useSelector((state) => state.authentication);

  const [init, setInit] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    async function getUser() {
      const user = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/${params.provider}/callback?${searchParams}`
      );
      const data = await user.json();
      if (data.error) {
        dispatch(handleError(data.error.message));
        dispatch(handleOpen("login"));
      } else {
        dispatch(handleToken(data.jwt));
        dispatch(handleClose());
      }
    }
    getUser();
    setInit(true);
  }, []);

  useEffect(() => {
    if (init) {
      redirect(route);
    }
  }, [init]);

  // router.replace(route);
}

export default Redirect;
