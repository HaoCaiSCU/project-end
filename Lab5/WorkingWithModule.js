const module = {
  id: 2,
  name: "Introduction to NodeJS",
  description: "Learn the basics of NodeJS and how to create a server with Express",
  course: "Web Development",
};

export default function WorkWithModule(app) {
  app.get("/lab5/module", (req, res) => {
    res.json(module);
  });

  app.get("/lab5/module/name", (req, res) => {
    res.json(module.name);
  });

  
  app.get("/lab5/module/name/:name", (req, res) => {
    const { name } = req.params;
    module.name = name;
    res.json(module);
  });

  
  app.get("/lab5/module/description/:description", (req, res) => {
    const { description } = req.params;
    module.description = description;
    res.json(module);
  });
}
