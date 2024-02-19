import { X } from "lucide-react";
import { ForwardedRef, forwardRef } from "react";

interface ModalProps {
	children: React.ReactNode;
}

const Modal = forwardRef(function ModalComponent(
	{ children }: ModalProps,
	ref: ForwardedRef<HTMLDialogElement | null>
) {
	function closeModal() {
		if (ref && "current" in ref && ref.current) {
			ref.current.close();
		}
	}

	return (
		<dialog ref={ref} onClick={closeModal} className="rounded-md shadow-md">
			<div className="relative px-16 py-8" onClick={e => e.stopPropagation()}>
				<button
					className="absolute right-2 top-2 transition-all hover:scale-110 focus:scale-110"
					onClick={closeModal}
				>
					<X />
				</button>
				{children}
			</div>
		</dialog>
	);
});

export default Modal;
