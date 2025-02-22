export async function errorHandler(callback) {
  while (true) {
    try {
      const flag = await callback();
      return flag;
    } catch (error) {
      console.error(error.message);
    }
  }
}
