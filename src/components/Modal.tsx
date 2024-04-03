// ** Import core packages
import { ForwardedRef, forwardRef } from "react";

// ** Import icons
import { X } from "lucide-react";

interface ModalProps {
	children: React.ReactNode;
}

const Modal = forwardRef(function ModalComponent(
	{ children }: ModalProps,
	ref: ForwardedRef<HTMLDialogElement | null>
) {
	// Close when clicking outside or when clicking the close icon
	function closeModal() {
		if (ref && "current" in ref && ref.current) {
			ref.current.close();
		}
	}

	return (
		<dialog
			ref={ref}
			onClick={closeModal}
			data-testid="modal"
			className="rounded-md shadow-md"
		>
			<div
				className="relative px-16 py-8"
				onClick={e => e.stopPropagation()}
			>
				<button
					data-testid="modal-close"
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
