"use server";

import { getPublicIdFromUrl } from "@/lib/customFunctions";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient(); // ✅ Use a single Prisma instance

const requiredFields = [
  "name",
  "city",
  "image_url",
  "status",
  "n03_do_PUM",
  "powierzchnia_dzialki",
  "powierzchnia_nadziemia",
  "powierzchnia_podziemia",
  "powierzchnia_niezabudowana_dzialki",
  "powierzchnia_dachow",
  "powierzchnia_elewacji",
  "powierzchnia_netto",
  "powierzchnia_netto_podziemia",
  "powierzchnia_netto_nadziemia",
  "pum_i_puu",
  "pum",
  "puu",
  "powierzchnie_wspolne_nadziemia",
  "powierzchnia_garazu_w_nadziemiu",
  "liczba_kondygnacji",
  "liczba_miejsc_parkingowych",
  "liczba_parkliftow",
  "ilosc_mieszkan",
  "srednia_powierzchnia_mieszkania",
  "udzial_powierzchni_wspolnych_nadziemia",
  "pow_podziemia_do_pum_i_puu",
  "n01",
  "n03",
  "roboty_ziemne",
  "konstrukcja_podziemia",
  "konstrukcja_nadziemia",
  "elewacje",
  "dachy",
  "wykonczenie_nadziemia",
  "wykonczenie_podziemia",
  "windy",
  "instalacje_klimatyzacyjne",
  "instalacje_wodno_kanalizacyjne",
  "instalacje_gazowe",
  "instalacje_elektryczne",
  "instalacje_teletechniczne",
  "infrastruktura",
  "dfa",
  "sieci",
  "koszty_budowy",
  "bhp",
  "offset_poza_dzialka",
];

export async function createProject(
  prevState: { errors?: { form: string }; success?: string },
  formData: FormData
): Promise<{ errors?: { form: string }; success?: string }> {
  try {
    const formDataObject = Object.fromEntries(formData.entries());

    // Extract required fields

    // Check for missing values
    for (const field of requiredFields) {
      if (
        !formDataObject[field] ||
        (isNaN(parseFloat(formDataObject[field] as string)) &&
          !isNaN(Number(formDataObject[field])))
      ) {
        return {
          errors: { form: `Pole "${field}" jest wymagane i musi być poprawne` },
        };
      }
    }

    const existingProject = await prisma.project.findUnique({
      where: {
        name: formDataObject.name as string, // Assuming 'name' is the column to check
      },
    });

    if (existingProject) {
      return {
        errors: {
          form: `Projekt o nazwie "${formDataObject.name}" aktualnie istnieje. Zmień nazwę projektu na unikalna`,
        },
      };
    }

    const createdProject = await prisma.project.create({
      data: {
        name: formDataObject.name as string,
        city: formDataObject.city as string,
        image_url: formDataObject.image_url as string,
        status: formDataObject.status as string,
        n03_do_PUM: parseFloat(formDataObject.n03_do_PUM as string),
        user_id: "4f5a47fc-51c7-40f4-8492-5405c9a374a9", // Replace with dynamic user_id if needed
      },
    });

    await prisma.parameters.create({
      data: {
        powierzchnia_dzialki: parseFloat(
          formDataObject.powierzchnia_dzialki as string
        ),
        powierzchnia_nadziemia: parseFloat(
          formDataObject.powierzchnia_nadziemia as string
        ),
        powierzchnia_podziemia: parseFloat(
          formDataObject.powierzchnia_podziemia as string
        ),
        powierzchnia_niezabudowana_dzialki: parseFloat(
          formDataObject.powierzchnia_niezabudowana_dzialki as string
        ),
        powierzchnia_dachow: parseFloat(
          formDataObject.powierzchnia_dachow as string
        ),
        powierzchnia_elewacji: parseFloat(
          formDataObject.powierzchnia_elewacji as string
        ),
        powierzchnia_netto: parseFloat(
          formDataObject.powierzchnia_netto as string
        ),
        powierzchnia_netto_podziemia: parseFloat(
          formDataObject.powierzchnia_netto_podziemia as string
        ),
        powierzchnia_netto_nadziemia: parseFloat(
          formDataObject.powierzchnia_netto_nadziemia as string
        ),
        pum_i_puu: parseFloat(formDataObject.pum_i_puu as string),
        pum: parseFloat(formDataObject.pum as string),
        puu: parseFloat(formDataObject.puu as string),
        powierzchnie_wspolne_nadziemia: parseFloat(
          formDataObject.powierzchnie_wspolne_nadziemia as string
        ),
        powierzchnia_garazu_w_nadziemiu: parseFloat(
          formDataObject.powierzchnia_garazu_w_nadziemiu as string
        ),
        liczba_kondygnacji: parseFloat(
          formDataObject.liczba_kondygnacji as string
        ),
        liczba_miejsc_parkingowych: parseFloat(
          formDataObject.liczba_miejsc_parkingowych as string
        ),
        liczba_parkliftow: parseFloat(
          formDataObject.liczba_parkliftow as string
        ),
        ilosc_mieszkan: parseFloat(formDataObject.ilosc_mieszkan as string),
        srednia_powierzchnia_mieszkania: parseFloat(
          formDataObject.srednia_powierzchnia_mieszkania as string
        ),
        udzial_powierzchni_wspolnych_nadziemia: parseFloat(
          formDataObject.udzial_powierzchni_wspolnych_nadziemia as string
        ),
        pow_podziemia_do_pum_i_puu: parseFloat(
          formDataObject.pow_podziemia_do_pum_i_puu as string
        ),
        project_id: createdProject.id,
      },
    });

    await prisma.cost.create({
      data: {
        n01: parseFloat(formDataObject.n01 as string),
        n03: parseFloat(formDataObject.n03 as string),
        roboty_ziemne: parseFloat(formDataObject.roboty_ziemne as string),
        konstrukcja_podziemia: parseFloat(
          formDataObject.konstrukcja_podziemia as string
        ),
        konstrukcja_nadziemia: parseFloat(
          formDataObject.konstrukcja_nadziemia as string
        ),
        elewacje: parseFloat(formDataObject.elewacje as string),
        dachy: parseFloat(formDataObject.dachy as string),
        wykonczenie_nadziemia: parseFloat(
          formDataObject.wykonczenie_nadziemia as string
        ),
        wykonczenie_podziemia: parseFloat(
          formDataObject.wykonczenie_podziemia as string
        ),
        windy: parseFloat(formDataObject.windy as string),
        instalacje_klimatyzacyjne: parseFloat(
          formDataObject.instalacje_klimatyzacyjne as string
        ),
        instalacje_wodno_kanalizacyjne: parseFloat(
          formDataObject.instalacje_wodno_kanalizacyjne as string
        ),
        instalacje_gazowe: parseFloat(
          formDataObject.instalacje_gazowe as string
        ),
        instalacje_elektryczne: parseFloat(
          formDataObject.instalacje_elektryczne as string
        ),
        instalacje_teletechniczne: parseFloat(
          formDataObject.instalacje_teletechniczne as string
        ),
        infrastruktura: parseFloat(formDataObject.infrastruktura as string),
        dfa: parseFloat(formDataObject.dfa as string),
        sieci: parseFloat(formDataObject.sieci as string),
        koszty_budowy: parseFloat(formDataObject.koszty_budowy as string),
        bhp: parseFloat(formDataObject.bhp as string),
        offset_poza_dzialka: parseFloat(
          formDataObject.offset_poza_dzialka as string
        ),
        project_id: createdProject.id,
      },
    });

    console.log("✅ Project created successfully");
    revalidatePath("/search");
    return { success: "Projekt z sukcesem utworzony" }; // ✅ Return success message
  } catch (error) {
    console.error("❌ Database error:", error);
    return {
      errors: { form: "Coś poszło nie tak, spróbuj później" },
    }; // ✅ Handle errors gracefully
  }
}

export async function updateProject(
  projectId: string,
  prevState: { errors?: { form: string }; success?: string },
  formData: FormData
): Promise<{ errors?: { form: string }; success?: string }> {
  try {
    const formDataObject = Object.fromEntries(formData.entries());
    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        name: formDataObject.name as string,
        city: formDataObject.city as string,
        image_url: formDataObject.image_url as string,
        status: formDataObject.status as string,
        n03_do_PUM: parseFloat(formDataObject.n03_do_PUM as string),
      },
    });

    await prisma.parameters.update({
      where: {
        project_id: projectId,
      },
      data: {
        powierzchnia_dzialki: parseFloat(
          formDataObject.powierzchnia_dzialki as string
        ),
        powierzchnia_nadziemia: parseFloat(
          formDataObject.powierzchnia_nadziemia as string
        ),
        powierzchnia_podziemia: parseFloat(
          formDataObject.powierzchnia_podziemia as string
        ),
        powierzchnia_niezabudowana_dzialki: parseFloat(
          formDataObject.powierzchnia_niezabudowana_dzialki as string
        ),
        powierzchnia_dachow: parseFloat(
          formDataObject.powierzchnia_dachow as string
        ),
        powierzchnia_elewacji: parseFloat(
          formDataObject.powierzchnia_elewacji as string
        ),
        powierzchnia_netto: parseFloat(
          formDataObject.powierzchnia_netto as string
        ),
        powierzchnia_netto_podziemia: parseFloat(
          formDataObject.powierzchnia_netto_podziemia as string
        ),
        powierzchnia_netto_nadziemia: parseFloat(
          formDataObject.powierzchnia_netto_nadziemia as string
        ),
        pum_i_puu: parseFloat(formDataObject.pum_i_puu as string),
        pum: parseFloat(formDataObject.pum as string),
        puu: parseFloat(formDataObject.puu as string),
        powierzchnie_wspolne_nadziemia: parseFloat(
          formDataObject.powierzchnie_wspolne_nadziemia as string
        ),
        powierzchnia_garazu_w_nadziemiu: parseFloat(
          formDataObject.powierzchnia_garazu_w_nadziemiu as string
        ),
        liczba_kondygnacji: parseFloat(
          formDataObject.liczba_kondygnacji as string
        ),
        liczba_miejsc_parkingowych: parseFloat(
          formDataObject.liczba_miejsc_parkingowych as string
        ),
        liczba_parkliftow: parseFloat(
          formDataObject.liczba_parkliftow as string
        ),
        ilosc_mieszkan: parseFloat(formDataObject.ilosc_mieszkan as string),
        srednia_powierzchnia_mieszkania: parseFloat(
          formDataObject.srednia_powierzchnia_mieszkania as string
        ),
        udzial_powierzchni_wspolnych_nadziemia: parseFloat(
          formDataObject.udzial_powierzchni_wspolnych_nadziemia as string
        ),
        pow_podziemia_do_pum_i_puu: parseFloat(
          formDataObject.pow_podziemia_do_pum_i_puu as string
        ),
      },
    });

    await prisma.cost.update({
      where: {
        project_id: projectId,
      },
      data: {
        n01: parseFloat(formDataObject.n01 as string),
        n03: parseFloat(formDataObject.n03 as string),
        roboty_ziemne: parseFloat(formDataObject.roboty_ziemne as string),
        konstrukcja_podziemia: parseFloat(
          formDataObject.konstrukcja_podziemia as string
        ),
        konstrukcja_nadziemia: parseFloat(
          formDataObject.konstrukcja_nadziemia as string
        ),
        elewacje: parseFloat(formDataObject.elewacje as string),
        dachy: parseFloat(formDataObject.dachy as string),
        wykonczenie_nadziemia: parseFloat(
          formDataObject.wykonczenie_nadziemia as string
        ),
        wykonczenie_podziemia: parseFloat(
          formDataObject.wykonczenie_podziemia as string
        ),
        windy: parseFloat(formDataObject.windy as string),
        instalacje_klimatyzacyjne: parseFloat(
          formDataObject.instalacje_klimatyzacyjne as string
        ),
        instalacje_wodno_kanalizacyjne: parseFloat(
          formDataObject.instalacje_wodno_kanalizacyjne as string
        ),
        instalacje_gazowe: parseFloat(
          formDataObject.instalacje_gazowe as string
        ),
        instalacje_elektryczne: parseFloat(
          formDataObject.instalacje_elektryczne as string
        ),
        instalacje_teletechniczne: parseFloat(
          formDataObject.instalacje_teletechniczne as string
        ),
        infrastruktura: parseFloat(formDataObject.infrastruktura as string),
        dfa: parseFloat(formDataObject.dfa as string),
        sieci: parseFloat(formDataObject.sieci as string),
        koszty_budowy: parseFloat(formDataObject.koszty_budowy as string),
        bhp: parseFloat(formDataObject.bhp as string),
        offset_poza_dzialka: parseFloat(
          formDataObject.offset_poza_dzialka as string
        ),
      },
    });

    for (const field of requiredFields) {
      if (
        !formDataObject[field] ||
        (isNaN(parseFloat(formDataObject[field] as string)) &&
          !isNaN(Number(formDataObject[field])))
      ) {
        return {
          errors: { form: `Pole "${field}" jest wymagane i musi być poprawne` },
        };
      }
    }
    revalidatePath("/search");
    return { success: "Projekt z sukcesem utworzony" };
  } catch (error) {
    console.error("❌ Database error:", error);
    return {
      errors: { form: "Coś poszło nie tak, spróbuj później" },
    }; // ✅ Handle errors gracefully
  }
}

const handleDelete = async (publicId: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  console.log(`public id${publicId}`);
  try {
    const response = await fetch(`${baseUrl}/api/delete-image`, {
      method: "DELETE",
      body: JSON.stringify({ publicId }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    console.log(data?.message);
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};

export async function deleteProject(
  prevState: { errors?: { form: string }; success?: string },
  formData: FormData
): Promise<{ errors?: { form: string }; success?: string }> {
  try {
    const projectId = formData.get("projectId") as string;
    const selectedProject = await prisma.project.findUnique({
      where: { id: projectId },
    });
    await prisma.parameters.delete({
      where: {
        project_id: projectId,
      },
    });
    await prisma.cost.delete({
      where: {
        project_id: projectId,
      },
    });
    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });
    if (
      selectedProject.image_url !==
      "https://res.cloudinary.com/duv2kieyz/image/upload/v1740656853/my-nextjs-project/sg05cnm7lcq9ccu2jyvb.jpg"
    ) {
      await handleDelete(getPublicIdFromUrl(selectedProject.image_url));
    }

    console.log("✅ Project deleted successfully");
    revalidatePath("/search");
    return { success: "Projekt z sukcesem usunięty" };
  } catch (error) {
    console.error("❌ Database error:", error);
    return {
      errors: { form: "Coś poszło nie tak, spróbuj później" },
    };
  }
}
