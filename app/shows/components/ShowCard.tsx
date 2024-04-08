"use client";

import { useState } from "react";
import { Box, Card, CardBody, Text, Heading, Stack } from "@chakra-ui/react";
import Image from "next/image";
import ShowModal from "./ShowModal";

export default function ShowCard({ show }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <Box onClick={toggleModal}>
        <Card direction={{ base: "column", sm: "row" }} overflow="hidden">
          <div
            style={{
              position: "relative",
              minWidth: "33%",
              aspectRatio: "3/4",
            }}
          >
            {show.coverImage ? (
              <Image
                src={show.coverImage.extraLarge}
                alt={show.title.romaji}
                style={{ objectFit: "cover" }}
                fill
              ></Image>
            ) : null}
          </div>
          <Stack>
            <CardBody>
              <Heading size="md" noOfLines={1}>
                {show.title ? show.title.romaji : null}
              </Heading>

              <Text mt="2" noOfLines={5}>
                {show.description}
              </Text>
            </CardBody>
          </Stack>
        </Card>
      </Box>
      <ShowModal
        show={show}
        isOpen={isModalOpen}
        onClose={toggleModal}
      ></ShowModal>
    </div>
  );
}
