import { Prisma } from "@prisma/client";

export type teacher = {
  FullName: string;
  FName: string;
  LName: string;
  Bio: string;
  ContactEmail: string;
  ContactPhone: string;
  IsActive: boolean;
};

export type teacher_follow_result = {
  teacher_id: string;
  user_id: string;
  isFollowed: boolean;
  message: string;
};

export type teacher_with_photo = Prisma.TeacherGetPayload<{
  include: {
    Photo: {
      include: {
        Photo: true;
      };
    };
  };
}>;
