import { useEffect, useState } from "react"

interface UseAnchorPositionProps {
    anchor: "top" | "bottom" | "left" | "right"
    isOpen: boolean
    inputRef: React.RefObject<HTMLButtonElement | null>
    popupRef: React.RefObject<HTMLDivElement | null>
}
const useAnchorPosition = ({ anchor, isOpen, inputRef, popupRef }: UseAnchorPositionProps) => {
    const [adjustedAnchor, setAdjustedAnchor] = useState(anchor);

    useEffect(() => {
        if (!isOpen || !popupRef.current || !inputRef.current) return;

        const popup = popupRef.current;
        const input = inputRef.current;
        const rect = input.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let newAnchor = anchor;

        if (anchor === "left" && rect.left < popup.offsetWidth) {
            newAnchor = "right";
        } else if (anchor === "right" && rect.right + popup.offsetWidth > viewportWidth) {
            newAnchor = "left";
        } else if (anchor === "top" && rect.top < popup.offsetHeight) {
            newAnchor = "bottom";
        } else if (anchor === "bottom" && rect.bottom + popup.offsetHeight > viewportHeight) {
            newAnchor = "top";
        }

        setAdjustedAnchor(newAnchor);
    }, [isOpen, anchor]);

    return adjustedAnchor
}

export default useAnchorPosition