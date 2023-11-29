"use client";
import { useSelector } from "react-redux";
import Modal from "../../../../shared/modal";
import ShortView from "../../../../shared/productShortView";
import { closeQuickView } from "../../../../../store/slices/quickViewSlice";
import useQuickView from "./useQuickView";

function QuickView() {
  const { open, data } = useSelector((state) => state.quickView);

  const { quickViewData, styles } = useQuickView(data);

  return (
    <Modal open={open} handleClose={closeQuickView} dispatchable style={styles}>
      <ShortView data={quickViewData} variant={"quickView"} />
    </Modal>
  );
}

export default QuickView;
