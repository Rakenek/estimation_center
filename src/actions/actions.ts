'use server';

import { auth } from '@/auth';
import { hashPasswordWithSalt } from '@/lib/bcryptFunctions';
import { getPublicIdFromUrl } from '@/lib/customFunctions';
import { PrismaClient, Role } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { FullSteelPriceData, MaterialPriceData } from '@/lib/data';

const prisma = new PrismaClient(); // ✅ Use a single Prisma instance

const requiredFields = [
  'name',
  'city',
  'image_url',
  'status',
  'n03_do_PUM',
  'powierzchnia_dzialki',
  'powierzchnia_zabudowy_nadziemia',
  'powierzchnia_zabudowy_podziemia',
  'powierzchnia_zabudowy_nadziemia_poza_obrysem_podziemia',
  'powierzchnia_niezabudowana_dzialki',
  'powierzchnia_dachow',
  'powierzchnia_elewacji',
  'powierzchnia_netto',
  'powierzchnia_netto_podziemia',
  'powierzchnia_netto_nadziemia',
  'pum_i_puu',
  'pum',
  'puu',
  'powierzchnie_wspolne_nadziemia',
  'powierzchnia_garazu_w_nadziemiu',
  'liczba_kondygnacji_podziemnych',
  'liczba_kondygnacji_nadziemnych',
  'liczba_miejsc_parkingowych_w_budynku',
  'liczba_parkliftow',
  'ilosc_mieszkan',
  'srednia_powierzchnia_mieszkania',
  'udzial_powierzchni_wspolnych_nadziemia',
  'pow_podziemia_do_pum_i_puu',
  'n01',
  'n03',
  'roboty_ziemne',
  'zabezpieczenie_wykopow',
  'sciany_szczelinowe',
  'roboty_palowe',
  'prace_fundamentowe',
  'konstrukcja_podziemia',
  'konstrukcja_nadziemia',
  'elewacje',
  'dachy',
  'wykonczenie_nadziemia',
  'wykonczenie_podziemia',
  'windy',
  'parklifty',
  'instalacje_klimatyzacyjne',
  'instalacje_wodno_kanalizacyjne',
  'instalacje_gazowe',
  'instalacje_elektryczne',
  'instalacje_teletechniczne',
  'infrastruktura',
  'dfa',
  'zielen',
  'sieci',
  'koszty_budowy',
  'bhp',
  'offset_poza_dzialka',
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
    const session = await auth();
    const user = await prisma.user.findUnique({
      where: {
        username: session?.user?.name,
      },
    });

    const createdProject = await prisma.project.create({
      data: {
        name: formDataObject.name as string,
        city: formDataObject.city as string,
        image_url: formDataObject.image_url as string,
        status: formDataObject.status as string,
        n03_do_PUM: parseFloat(formDataObject.n03_do_PUM as string),
        user_id: user.id, // Replace with dynamic user_id if needed
      },
    });

    await prisma.parameters.create({
      data: {
        powierzchnia_dzialki: parseFloat(
          formDataObject.powierzchnia_dzialki as string
        ),
        powierzchnia_zabudowy_nadziemia: parseFloat(
          formDataObject.powierzchnia_zabudowy_nadziemia as string
        ),
        powierzchnia_zabudowy_podziemia: parseFloat(
          formDataObject.powierzchnia_zabudowy_podziemia as string
        ),
        powierzchnia_zabudowy_nadziemia_poza_obrysem_podziemia: parseFloat(
          formDataObject.powierzchnia_zabudowy_nadziemia_poza_obrysem_podziemia as string
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
        liczba_kondygnacji_podziemnych: parseFloat(
          formDataObject.liczba_kondygnacji_podziemnych as string
        ),
        liczba_kondygnacji_nadziemnych: parseFloat(
          formDataObject.liczba_kondygnacji_nadziemnych as string
        ),
        liczba_miejsc_parkingowych_w_budynku: parseFloat(
          formDataObject.liczba_miejsc_parkingowych_w_budynku as string
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
        zabezpieczenie_wykopow: parseFloat(
          formDataObject.zabezpieczenie_wykopow as string
        ),
        sciany_szczelinowe: parseFloat(
          formDataObject.sciany_szczelinowe as string
        ),
        roboty_palowe: parseFloat(formDataObject.roboty_palowe as string),
        prace_fundamentowe: parseFloat(
          formDataObject.prace_fundamentowe as string
        ),
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
        parklifty: parseFloat(formDataObject.parklifty as string),
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
        zielen: parseFloat(formDataObject.zielen as string),
        sieci: parseFloat(formDataObject.sieci as string),
        koszty_budowy: parseFloat(formDataObject.koszty_budowy as string),
        bhp: parseFloat(formDataObject.bhp as string),
        offset_poza_dzialka: parseFloat(
          formDataObject.offset_poza_dzialka as string
        ),
        project_id: createdProject.id,
      },
    });

    console.log('✅ Project created successfully');
    revalidatePath('/search');
    return { success: 'Projekt z sukcesem utworzony' }; // ✅ Return success message
  } catch (error) {
    console.error('❌ Database error:', error);
    return {
      errors: { form: 'Coś poszło nie tak, spróbuj później' },
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
        powierzchnia_zabudowy_nadziemia: parseFloat(
          formDataObject.powierzchnia_zabudowy_nadziemia as string
        ),
        powierzchnia_zabudowy_podziemia: parseFloat(
          formDataObject.powierzchnia_zabudowy_podziemia as string
        ),
        powierzchnia_zabudowy_nadziemia_poza_obrysem_podziemia: parseFloat(
          formDataObject.powierzchnia_zabudowy_nadziemia_poza_obrysem_podziemia as string
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
        liczba_kondygnacji_podziemnych: parseFloat(
          formDataObject.liczba_kondygnacji_podziemnych as string
        ),
        liczba_kondygnacji_nadziemnych: parseFloat(
          formDataObject.liczba_kondygnacji_nadziemnych as string
        ),
        liczba_miejsc_parkingowych_w_budynku: parseFloat(
          formDataObject.liczba_miejsc_parkingowych_w_budynku as string
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
        zabezpieczenie_wykopow: parseFloat(
          formDataObject.zabezpieczenie_wykopow as string
        ),
        sciany_szczelinowe: parseFloat(
          formDataObject.sciany_szczelinowe as string
        ),
        roboty_palowe: parseFloat(formDataObject.roboty_palowe as string),
        prace_fundamentowe: parseFloat(
          formDataObject.prace_fundamentowe as string
        ),
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
        parklifty: parseFloat(formDataObject.parklifty as string),
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
        zielen: parseFloat(formDataObject.zielen as string),
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
    revalidatePath('/search');
    return { success: 'Projekt z sukcesem utworzony' };
  } catch (error) {
    console.error('❌ Database error:', error);
    return {
      errors: { form: 'Coś poszło nie tak, spróbuj później' },
    }; // ✅ Handle errors gracefully
  }
}

const handleDelete = async (publicId: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const response = await fetch(`${baseUrl}/api/delete-image`, {
      method: 'DELETE',
      body: JSON.stringify({ publicId }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    console.log(data?.message);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};

export async function deleteProject(
  prevState: { errors?: { form: string }; success?: string },
  formData: FormData
): Promise<{ errors?: { form: string }; success?: string }> {
  try {
    const projectId = formData.get('projectId') as string;
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
      'https://res.cloudinary.com/duv2kieyz/image/upload/v1740656853/my-nextjs-project/sg05cnm7lcq9ccu2jyvb.jpg'
    ) {
      await handleDelete(getPublicIdFromUrl(selectedProject.image_url));
    }

    console.log('✅ Project deleted successfully');
    revalidatePath('/search');
    return { success: 'Projekt z sukcesem usunięty' };
  } catch (error) {
    console.error('❌ Database error:', error);
    return {
      errors: { form: 'Coś poszło nie tak, spróbuj później' },
    };
  }
}

export async function onGetUserAction() {
  const session = await auth();
  return session?.user?.name ?? null;
}

export async function createUserAction(
  prevState: { errors?: { form: string }; success?: string },
  formData: FormData
) {
  try {
    const formDataObject = Object.fromEntries(formData.entries());
    const user = await prisma.user.create({
      data: {
        username: formDataObject.username as string,
        email: formDataObject.email as string,
        password: await hashPasswordWithSalt(formDataObject.password as string),
        role: Role.USER,
      },
    });

    return { success: 'Użytkowanik z sukcesem utworzony' };
  } catch (error) {
    console.error('❌ Database error:', error);
    return {
      errors: { form: 'Coś poszło nie tak, spróbuj później' },
    };
  }
}

export async function addSteelPriceData(
  prevState: { errors?: { form: string }; success?: string },
  formData: FormData
) {
  try {
    const formDataObject = Object.fromEntries(formData.entries());
    const avg =
      (parseFloat(formDataObject.minPUDS as string) +
        parseFloat(formDataObject.maxPUDS as string)) /
      2;
    const pref = Math.round((avg + 800) / 25) * 25;
    const compl = pref + 2000;

    // const user1 = await prisma.user.create({
    //   data: {
    //     username: 'Kamil',
    //     email: 'kam@gmail.com',
    //     password: '', // Normally you would hash the password
    //     role: Role.ADMIN, // Assuming Role is an enum with values like USER, ADMIN, etc.
    //     image: '',
    //   },
    // });

    // const steelPrice = await prisma.steelPrice.createMany({
    //   data: FullSteelPriceData,
    // });

    // const materialPrice = await prisma.materialPrice.createMany({
    //   data: MaterialPriceData,
    // });

    const steelData = await prisma.steelPrice.create({
      data: {
        year: parseFloat(formDataObject.year as string),
        week: formDataObject.week as string,
        min_PUDS: parseFloat(formDataObject.minPUDS as string),
        max_PUDS: parseFloat(formDataObject.maxPUDS as string),
        avg_PUDS: avg,
        prefabricated: pref,
        complete: compl,
      },
    });

    return { success: 'Dane kosztu stali z sukcesem dodane' };
  } catch (error) {
    console.error('❌ Database error:', error);
    return {
      errors: { form: 'Coś poszło nie tak, spróbuj później' },
    };
  }
}

export async function addMaterialPriceData(
  prevState: { errors?: { form: string }; success?: string },
  formData: FormData
) {
  try {
    const formDataObject = Object.fromEntries(formData.entries());

    const materialData = await prisma.materialPrice.create({
      data: {
        year: parseFloat(formDataObject.year as string),
        month: parseFloat(formDataObject.month as string),
        sciany_kominy: parseFloat(formDataObject.sciany_kominy as string),
        izolacje_wodochronne: parseFloat(
          formDataObject.izolacje_wodochronne as string
        ),
        dachy_rynny: parseFloat(formDataObject.dachy_rynny as string),
        izolacje_termiczne: parseFloat(
          formDataObject.izolacje_termiczne as string
        ),
        chemia_budowlana: parseFloat(formDataObject.chemia_budowlana as string),
        stolarka: parseFloat(formDataObject.stolarka as string),
        sucha_zabudowa: parseFloat(formDataObject.sucha_zabudowa as string),
        plyty_osb: parseFloat(formDataObject.plyty_osb as string),
        narzedzia: parseFloat(formDataObject.narzedzia as string),
        cement_wapno: parseFloat(formDataObject.cement_wapno as string),
        farby_lakiery: parseFloat(formDataObject.farby_lakiery as string),
        plytki_lazienki_kuchnie: parseFloat(
          formDataObject.plytki_lazienki_kuchnie as string
        ),
        instalacje_ogrzewania: parseFloat(
          formDataObject.instalacje_ogrzewania as string
        ),
        wyposazenie_agd: parseFloat(formDataObject.wyposazenie_agd as string),
        ogrod_hobby: parseFloat(formDataObject.ogrod_hobby as string),
        dekoracje: parseFloat(formDataObject.dekoracje as string),
        motoryzacja: parseFloat(formDataObject.motoryzacja as string),
        wykonczenia: parseFloat(formDataObject.wykonczenia as string),
        elektryka_oswietlenie: parseFloat(
          formDataObject.elektryka_oswietlenie as string
        ),
        otoczenie_domu: parseFloat(formDataObject.otoczenie_domu as string),
      },
    });

    return { success: 'Dane kosztu stali z sukcesem dodane' };
  } catch (error) {
    console.error('❌ Database error:', error);
    return {
      errors: { form: 'Coś poszło nie tak, spróbuj później' },
    };
  }
}
