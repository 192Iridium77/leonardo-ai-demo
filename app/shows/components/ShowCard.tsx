"use client";

import { useState } from "react";
import { Box, Card, CardBody, Text, Heading, Stack } from "@chakra-ui/react";
import Image from "next/image";
import ShowModal from "./ShowModal";
import { Show } from "@/app/lib/definitions";

export default function ShowCard({ show }: { show: Show }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const parseDescription = (description: string) =>
    description.replaceAll("<br>", "");

  return (
    <>
      <Box onClick={toggleModal} cursor="pointer">
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
                sizes="((min-width: 50em) and (max-width: 60em)) 50em,
                ((min-width: 30em) and (max-width: 50em)) 30em,
                (max-width: 30em) 20em"
                placeholder="blur"
                blurDataURL={show.coverImage.medium}
              ></Image>
            ) : null}
          </div>
          <Stack>
            <CardBody>
              <Heading size="md" noOfLines={1}>
                {show.title ? show.title.romaji : null}
              </Heading>

              <Text mt="2" noOfLines={5}>
                {parseDescription(show?.description || "")}
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
    </>
  );
}
