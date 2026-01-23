import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { CloseIcon } from "./icons";
import { createPortal } from "react-dom";

// Using a custom hook to handle the Escape key and body scroll lock
const useModal = (isOpen, onClose) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);
};

export function Modal({ isOpen, onClose, children, className }) {
    const [isVisible, setIsVisible] = useState(false);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            // Small delay to trigger animation
            requestAnimationFrame(() => setAnimate(true));
        } else {
            setAnimate(false);
            const timer = setTimeout(() => setIsVisible(false), 200); // 200ms duration
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useModal(isOpen, onClose);

    if (!isVisible) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 text-center sm:text-left">
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ease-out",
                    animate ? "opacity-100" : "opacity-0"
                )}
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div
                className={cn(
                    "relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all duration-200 ease-out sm:w-full sm:max-w-lg",
                    animate ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4",
                    className
                )}
            >
                {children}
            </div>
        </div>,
        document.body
    );
}

export function ModalHeader({ children, className }) {
    return (
        <div className={cn("px-6 pt-6 pb-4", className)}>
            {children}
        </div>
    );
}

export function ModalTitle({ children, className }) {
    return (
        <h3 className={cn("text-lg font-semibold leading-6 text-gray-900", className)}>
            {children}
        </h3>
    );
}

export function ModalDescription({ children, className }) {
    return (
        <div className={cn("mt-2 text-sm text-gray-500", className)}>
            {children}
        </div>
    );
}

export function ModalContent({ children, className }) {
    return <div className={cn("px-6 py-2", className)}>{children}</div>;
}

export function ModalFooter({ children, className }) {
    return (
        <div className={cn("px-6 py-4 bg-gray-50 flex justify-end gap-3", className)}>
            {children}
        </div>
    );
}
