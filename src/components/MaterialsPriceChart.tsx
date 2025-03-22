"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MaterialPrice } from "@prisma/client";
import {
  getUniqueYearsTable,
  transformMaterialPrice,
} from "@/lib/customFunctions";
import Button from "./Button";
import { MaterialPriceData } from "@/lib/data";
import MaterialPriceTable from "./MaterialPriceTable";

interface MaterialPriceChartProps {
  materialPriceData: MaterialPrice[];
}

const MaterialsPriceChart = ({
  materialPriceData,
}: MaterialPriceChartProps) => {
  const [pickedYear, setPickedYear] = React.useState<number>(2024);
  const allYears = getUniqueYearsTable(materialPriceData);

  const filteredYear = materialPriceData.filter(
    (item) => item.year === pickedYear
  );
  const transformedData = transformMaterialPrice(filteredYear);

  return (
    <>
      <div className="flex justify-center space-x-4 p-2">
        {allYears.map((year) => (
          <Button key={year} onClick={() => setPickedYear(year)}>
            {year}
          </Button>
        ))}
      </div>
      <div className="w-full p-4 bg-white shadow-md rounded-2xl text-black">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex justify-center items-center">
          Zmiana ceny materiałów miesiąc do miesiąca w roku {pickedYear} [%].
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={transformedData} barSize={50}>
            <XAxis dataKey="yearAndMonth" style={{ fontSize: "14px" }} />
            <YAxis style={{ fontSize: "14px" }} />
            <Tooltip
              itemStyle={{
                fontSize: "14px",
                margin: 0,
                padding: "2px",
                lineHeight: "1.2em",
              }}
              labelStyle={{ fontSize: "16px" }}
            />
            <Legend wrapperStyle={{ fontSize: "14px" }} />
            <Bar
              dataKey="sciany_kominy"
              fill="#8884d8"
              name="Ściany i Kominy"
            />
            <Bar
              dataKey="izolacje_wodochronne"
              fill="#82ca9d"
              name="Izolacje Wodochronne"
            />
            <Bar dataKey="dachy_rynny" fill="#ffc658" name="Dachy i Rynny" />
            <Bar
              dataKey="izolacje_termiczne"
              fill="#58f9ff"
              name="Izolacje Termiczne"
            />
            <Bar
              dataKey="chemia_budowlana"
              fill="#ec58ff"
              name="Chemia Budowlana"
            />
            <Bar dataKey="stolarka" fill="#5895ff" name="Stolarka" />
            <Bar
              dataKey="sucha_zabudowa"
              fill="#ff8558"
              name="Sucha Zabudowa"
            />
            <Bar dataKey="plyty_osb" fill="#05ee72" name="Płyty OSB" />
            <Bar dataKey="narzedzia" fill="#b07808" name="Narzędzia" />
            <Bar dataKey="cement_wapno" fill="#ffee58" name="Cement i Wapno" />
            <Bar
              dataKey="farby_lakiery"
              fill="#b158ff"
              name="Farby i Lakiery"
            />
            <Bar
              dataKey="plytki_lazienki_kuchnie"
              fill="#14409f"
              name="Płytki Łazienki Kuchnie"
            />
            <Bar
              dataKey="instalacje_ogrzewania"
              fill="#d32121"
              name="Instalacje Ogrzewania"
            />
            <Bar
              dataKey="wyposazenie_agd"
              fill="#4d0780"
              name="Wyposażenie AGD"
            />
            <Bar dataKey="ogrod_hobby" fill="#056417" name="Ogród i Hobby" />
            <Bar dataKey="dekoracje" fill="#5a0909" name="Dekoracje" />
            <Bar dataKey="motoryzacja" fill="#080a86" name="Motoryzacja" />
            <Bar dataKey="wykonczenia" fill="#e4e400" name="Wykończenia" />
            <Bar
              dataKey="elektryka_oswietlenie"
              fill="#70f8c1"
              name="Elektryka i Oświetlenie"
            />
            <Bar
              dataKey="otoczenie_domu"
              fill="#576f0d"
              name="Otoczenie domu"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <MaterialPriceTable materialPriceData={filteredYear} />
      </div>
    </>
  );
};

export default MaterialsPriceChart;
