import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categoryGroups = [
  "Alimentação",
  "Saúde",
  "Compras",
  "Serviços",
  "Lazer",
  "Veículos"
];

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function main(): Promise<void> {
  const city = await prisma.city.upsert({
    where: { slug: "montividiu" },
    update: {},
    create: {
      name: "Montividiu",
      state: "GO",
      slug: "montividiu",
      description: "Cidade padrão do MVP",
      order: 1
    }
  });

  await Promise.all(
    categoryGroups.map((name, index) =>
      prisma.categoryGroup.upsert({
        where: { slug: slugify(name) },
        update: {},
        create: {
          name,
          slug: slugify(name),
          order: index + 1
        }
      })
    )
  );

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: "Palma da Mão",
      slogan: "As melhores empresas da sua cidade em um só lugar.",
      primaryColor: "#0069FC",
      defaultCityId: city.id,
      homeText: "Encontre empresas locais em Montividiu.",
      footerText: "Palma da Mão"
    }
  });

  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@palmadamao.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";

  await prisma.userAdmin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Administrador",
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 12)
    }
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
