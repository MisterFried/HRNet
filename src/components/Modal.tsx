// ** Import core packages
import { ForwardedRef, forwardRef } from "react";

// ** Import icons
import { X } from "lucide-react";

/**
 * Returns the Modal component.
 * The content of the modal is passed as children
 * 
 * @param ref - The ref of the modal
 * 
 */
const Modal = forwardRef(function ModalComponent(
	{ children }: { children: React.ReactNode },
	ref: ForwardedRef<HTMLDialogElement | null>
) {
	/**
	 * Closes the modal
	 */
	function closeModal() {
		if (ref && "current" in ref && ref.current) {
			ref.current.close();
		}
	}

	// The modal will be closed when the user clicks on the backdrop (outside the dialog)
	// or when the user clicks on the close button
	return (
		<dialog
			ref={ref}
			onClick={closeModal}
			data-testid="modal"
			className="rounded-md shadow-md"
		>
			<div
				className="relative px-16 py-8"
				// Stops the click event from bubbling up to the parent dialog element
				// and closing the modal
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
