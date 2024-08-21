import supabase from "./supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASEURL;

export async function getCarbins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return cabins;
}

export async function deleteCarbin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}

export async function createEditCarbin(newCabin, id) {
  // 检查是否之前已经有上传过图片，如果上传过图片，那么newCabin的image属性是一个URL字符串，如果没有上传过图片，那么newCabin的image属性是一个File对象
  // 如果上传过图片，那么就是在修改Cabin的情况下，因为创建Cabin的时候图片肯定是新添加的File对象
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // 如果image是File对象，那么需要对其进行解析处理
  const newCabinData = hasImagePath
    ? newCabin
    : { ...newCabin, image: newCabin.image[0] };

  // image储存路径示例：https://umxsqalvuoaaogzvkkuc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = hasImagePath
    ? ""
    : `${Math.random()}-${newCabinData.image.name}`.replace("/", "");

  // image是URL就可以直接使用，如果不是再创建图片路径URL字符串
  const imagePath = hasImagePath
    ? newCabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 代码复用的写法，把这部分提取出来
  let query = supabase.from("cabins");

  if (!id) {
    // 1A. Create cabin
    // 这里等于supabase.from("cabins").insert()
    query = query.insert([{ ...newCabinData, image: imagePath }]); // newCabin里提交的image是个File对象，但是储存的时候image应该是个URL字符串，所以要用定义好的路径来进行覆盖
  } else {
    // 1B. Edit cabin
    query = query.update({ ...newCabinData, image: imagePath }).eq("id", id);
  }

  const { data: cabin, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. upload image - 如果用户修改了图片才重新上传图片，否则返回原数据
  if (hasImagePath) return cabin;

  const { error: storageError } = await supabase.storage
    // 指定储存到cabin-images这个bucket里
    .from("cabin-images")
    // 把newCabin里的image对象用文件名imageName进行储存
    .upload(imageName, newCabinData.image, {
      cacheControl: "3600",
      upsert: false,
    });

  // 3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", cabin.id);

    console.error(storageError);
    throw new Error("Image upload failed");
  }

  return cabin;
}

