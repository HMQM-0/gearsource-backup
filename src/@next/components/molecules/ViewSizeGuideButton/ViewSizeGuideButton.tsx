import React, { useState } from "react";
import { Icon } from "@components/atoms";
import * as S from "./styles";
import { IProps } from "./types";
import { Modal } from "@components/organisms/Modal";
import { Box } from "@mui/material";

export const ViewSizeGuideButton: React.FC<IProps> = ({
  sizeGuideUrl,
}: IProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <S.Wrapper onClick={() => setModalOpen(true)}>
      <Icon name="ruler" size={32} />
      <Box
        component="span"
        onClick={() => setModalOpen(true)}
        style={{ marginLeft: "0.8rem" }}
      >
        Size Guide
      </Box>
      <Modal
        submitButtonTestingContext="submitAddressFormModalButton"
        testingContext="submitAddressFormModal"
        title={"Size Guide"}
        hide={() => {
          setModalOpen(false);
        }}
        // formId={formId}
        disabled={false}
        show={modalOpen}
        // target={target}
        // submitBtnText={submitBtnText}
        submitBtnText="Close"
        onSubmit={() => setModalOpen(false)}
      >
        <img src={sizeGuideUrl} width="100%" />
      </Modal>
    </S.Wrapper>
  );
};
