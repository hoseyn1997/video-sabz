import { Prisma } from "@prisma/client";

export type videoWithCollection = Prisma.VideoGetPayload<{
  include: {
    Collection: {
      include: {
        Photo: {
          include: {
            Photo: true;
          };
        };
        Teacher: {
          include: {
            Photo: {
              include: {
                Photo: true;
              };
            };
          };
        };
      };
    };
    Photo: {
      include: {
        Photo: true;
      };
    };
  };
}>;

export type video = {
  Title: string;
  Order: number;
  ShortId: string;
  Description: string;
  CollectionId: string;
  IsFree: boolean;
};

export type videoWithPhoto = Prisma.VideoGetPayload<{
  include: {
    Photo: {
      include: {
        Photo: true;
      };
    };
  };
}>;

export type userVideoInteraction = {
  isLiked: boolean;
  isSaved: boolean;
  isTeacherFollowed: boolean;
  isSeen: boolean;
  message: string;
};

export type liking_result = {
  video_id: string;
  user_id: string;
  disliked: boolean;
  message: string;
};

export type saving_result = {
  video_id: string;
  user_id: string;
  isSaved: boolean;
  message: string;
};
