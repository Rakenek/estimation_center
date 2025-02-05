DROP TABLE "Parameters";
DROP TABLE "Cost";
DROP TABLE "Project";
DROP TABLE "User";

INSERT INTO "User" (id, email, name, role, password)
VALUES
  ('uuid1', 'alice@example.com', 'Alice', 'USER', 'hashed_password'),
    ('uuid2', 'bob@example.com', 'Bob', 'USER', 'hashed_password');


INSERT INTO "Project" (id, name, city, "imageUrl", "userId", "costId")
VALUES
  ('project-uuid1', 'Project A', 'Krakow','https://plus.unsplash.com/premium_vector-1724653697938-cc4868490f8f?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'uuid1', 'cost-uuid1'),
    ('project-uuid2', 'Project B', 'Warsaw','https://plus.unsplash.com/premium_vector-1724653697938-cc4868490f8f?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'uuid2', 'cost-uuid2');

INSERT INTO "Parameters" (id, "powDzialki", "powNadziemia", "powPodziemia", "powNiezabudowanaDzialki", "powElewacji", "powDachow",
                          "powNetto", "powNettoPodziemia", "powNettoNadziemia", pum, puu, pumpuu, "powWspolneNadziemia",
                                                    "liczbaMiejscParkingowych", "liczbaParkliftow", "iloscMieszkan", "sredniaPowMieszkania",
                                                                              "udzialPowWspolnejNadziemia", "powPodziemiaDoPUMPUU", "projectId")
                                                                              VALUES
                                                                                ('param-uuid1', 1000, 500, 200, 300, 100, 50, 1500, 200, 300, 50, 30, 20, 500, 5, 2, 10, 60, 10, 400, 'project-uuid1'),
                                                                                  ('param-uuid2', 1200, 600, 250, 350, 120, 60, 1600, 250, 350, 60, 35, 25, 600, 6, 3, 12, 65, 12, 450, 'project-uuid2');

INSERT INTO "Cost" (id, "przygotowanieGruntu", "robotyZiemne", "konstrukcjaPodziemia", "konstrukcjaNadziemia", elewacje, dachy,
                    "wykonczenieNadziemia", "wykonczeniePodziamia", windy, "instalacjeKlimatyzacyjne",
                                        "instalacjeWodnoKanalizacyjne", "instalacjeGazowe", "instalacjeElektryczne",
                                                            "instalacjeTeletechniczne", infrastruktura, dfa, sieci, "kosztyBudowy", bhp, "offsetPozaDzialka", "projectId")
                                                            VALUES
                                                              ('cost-uuid1', 50000, 30000, 20000, 15000, 10000, 8000, 7000, 5000, 3000, 2500, 2000, 1500, 1000, 500, 1000, 500, 10000, 2500, 1000, 0, 'project-uuid1'),
                                                                ('cost-uuid2', 60000, 35000, 22000, 16000, 11000, 9000, 7500, 5500, 3200, 2700, 2200, 1700, 1200, 600, 1200, 600, 11000, 2800, 1200, 0, 'project-uuid2')

