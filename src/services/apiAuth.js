import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

// 用户登录的实现 - Login页面
export async function login({ email, password }) {
  // 邮箱和密码登录
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

// 验证当前用户登录状态 - 访问其他页面
export async function getCurrentUser() {
  // check if this is a valid session
  const { data: session } = await supabase.auth.getSession();
  getSelection();

  // 如果session不存在或者已经过期，什么都不返回
  if (!session.session) return null;

  // 如果session存在，获得当前session的用户信息
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. update password or full name
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2. upload avatar image
  const fileName = `avatar=${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. update avatar in the user
  // https://umxsqalvuoaaogzvkkuc.supabase.co/storage/v1/object/public/avatars/default-user.jpg
  const { data: updatedUser, error: updateUserAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateUserAvatarError) throw new Error(updateUserAvatarError.message);

  return updatedUser;
}

