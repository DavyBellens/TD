export type Role = "ADMIN" | "USER";

export type Resource = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  filePath: string;
  thumbNail: string;
  profileId: string;
  categories: Category[];
  subjects: Subject[];
  comments: Comment[];
  likes: Like[];
};

export type Profile = {
  id: string;
  email: string;
  username: string;
  password: string;
  role: Role;
  age: number;
  preference: string;
  gender: string;
  interests: string[];
  socials: string[];
  pictures: string[];
  bio: string;
};

export type PersonalInformation = {
  email: string;
  username: string;
  password: string;
  role: Role;
  age: number;
  interests: string[];
  bio: string;
};

export type Like = {
  createdAt: Date;
  profileId: string;
  resourceId: string;
  commentId?: string;
};

export type Comment = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  message: string;
  profileId: string;
  resourceId: string;
  profile: {
    id: string;
    username: string;
  };
  likes: Like[];
  parentId: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Subject = {
  id: string;
  name: string;
};

export type StatusMessage = {
  message: string;
  type: "error" | "success";
};

export type Type = "users" | "resources" | "profiles" | "likes" | "categories" | "subjects" | "comments";
