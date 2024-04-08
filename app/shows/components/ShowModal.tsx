import {
  Box,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  Spinner,
} from "@chakra-ui/react";
import Image from "next/image";
import "./showModal.css";
import { Show } from "@/app/lib/definitions";

export default function ShowModal({
  isOpen,
  show,
  onClose,
}: {
  isOpen: boolean;
  show: Show;
  onClose: () => void;
}) {
  const parseDescription = show.description.replaceAll("<br>", "\n");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" id="show-modal">
      <ModalOverlay />
      {show ? (
        <ModalContent overflow="hidden">
          {show.bannerImage ? (
            <Box position="relative" height="120px">
              <Image
                src={show?.bannerImage}
                fill
                style={{ objectFit: "cover" }}
                alt={show?.title.romaji}
              ></Image>
            </Box>
          ) : null}
          <ModalHeader>{show?.title.romaji}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{parseDescription}</ModalBody>
        </ModalContent>
      ) : (
        <Spinner></Spinner>
      )}
    </Modal>
  );
}
