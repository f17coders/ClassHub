import { useEffect } from "react";
import { useLocation } from "react-router-dom";


// Link로 이동할 때 제일 위로 보내주는 함수

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};