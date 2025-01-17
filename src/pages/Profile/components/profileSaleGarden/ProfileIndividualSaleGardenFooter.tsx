import { Flex, Icon, Spinner, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { HeartIcon } from '@/assets/icons';
import { useLikeGarden } from '@/services/gardens/mutations';

interface ProfileIndividualSaleGardenFooterProps {
  garden: GardenForSale | undefined;
  refetchGardensForSale: () => void;
  onOpen?: () => void;
  setContact: Dispatch<SetStateAction<string>>;
  setGardenId: Dispatch<SetStateAction<number | null>>;
  setChatRoomId: Dispatch<SetStateAction<number>>;
}

const ProfileIndividualSaleGardenFooter = ({
  garden,
  refetchGardensForSale,
  onOpen,
  setContact,
  setGardenId,
  setChatRoomId,
}: ProfileIndividualSaleGardenFooterProps) => {
  const [liked, setLiked] = useState(garden?.isLiked);
  const [loading, setLoading] = useState(false);

  const { mutateLikeGarden } = useLikeGarden(liked, garden?.gardenId, setLiked);

  const handleClickLike = () => {
    if (loading) return;
    setLoading(true);

    mutateLikeGarden({
      type: garden?.isLiked ? 'cancel' : 'like',
      gardenLikeId: garden?.gardenId,
    });

    setTimeout(() => {
      refetchGardensForSale();

      setTimeout(() => {
        setLoading(false);
      }, 150);
    }, 250);
  };

  return (
    <Flex gap="14px">
      <Flex
        w="50%"
        h="40px"
        justifyContent="center"
        alignItems="center"
        gap="4px"
        borderRadius="6px"
        border="1px solid"
        borderColor={liked ? 'green.300' : 'gray.200'}
        cursor="pointer"
        onClick={handleClickLike}
      >
        {loading ? (
          <Spinner size="sm" emptyColor="gray.200" color="green.500" />
        ) : (
          <>
            <Icon as={HeartIcon} fill={liked ? 'green.500' : 'gray.300'} />
            <Text
              fontSize={{ mobile: '14px', tablet: '16px' }}
              color={liked ? 'green.500' : 'gray.300'}
            >
              찜하기
            </Text>
          </>
        )}
      </Flex>
      <Flex
        onClick={() => {
          if (onOpen && garden?.contact) {
            onOpen();
            setContact(garden?.contact);
            setGardenId(garden.gardenId);
            setChatRoomId(garden.chatRoomId);
          }
        }}
        w="50%"
        h="40px"
        justifyContent="center"
        alignItems="center"
        fontSize={{ mobile: '14px', tablet: '16px' }}
        color="white"
        borderRadius="6px"
        bgColor="green.500"
        cursor="pointer"
      >
        신청하기
      </Flex>
    </Flex>
  );
};

export default ProfileIndividualSaleGardenFooter;
