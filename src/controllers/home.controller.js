import path from "path";

export const getHomePage = (req, res) => {
  const filePath = path.join(process.cwd(), "public", "index.html");
  res.sendFile(filePath);
};
