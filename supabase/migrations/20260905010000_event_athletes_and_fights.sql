-- Dados fornecidos pelo organizador. Inserções idempotentes por nome.
insert into public.athletes (name,age,weight,belt,category,gender,academy,gi,nogi,notes)
select v.* from (values
('Miguel Lovato',12,61.00,'Branca','Infantil','Masculino',null,true,false,null),
('Ryan Emanoel',11,57.00,'Branca','Infantil','Masculino',null,true,false,null),
('Vitoria Queiroz',12,44.00,'Branca','Infantil','Feminino',null,true,false,null),
('Maria Lovato',10,45.00,'Branca','Infantil','Feminino',null,true,false,null),
('Henrique Ferreira',11,35.00,'Branca','Infantil','Masculino',null,true,false,null),
('Gabriel Jesus',10,36.00,'Branca','Infantil','Masculino',null,true,false,null),
('Luan Ferreira',9,29.00,'Branca','Infantil','Masculino',null,true,false,null),
('Gabriell Cassiano',8,27.80,'Branca','Infantil','Masculino',null,true,false,null),
('Heitor da Silva Santos',9,34.00,'Branca','Infantil','Masculino',null,true,false,null),
('João Miguel da Silva Seixas',12,38.30,'Branca','Infantil','Masculino',null,true,false,null),
('Andrya Batista',10,43.00,'Branca','Infantil','Feminino',null,true,false,null),
('Maria Clara',10,42.50,'Branca','Infantil','Feminino',null,true,false,null),
('Ana Gabriely Santos Silva',10,56.00,'Branca','Infantil','Feminino',null,true,false,'Faixa cadastrada provisoriamente como Branca; confirmar com a atleta.'),
('Sophia dos Santos Pimentel',10,61.00,'Branca','Infantil','Feminino',null,true,false,null),
('Lorenzo Cabeça',11,38.30,'Amarela','Infantil','Masculino',null,true,false,null),
('Ryan da Silva Morais',9,35.00,'Amarela','Infantil','Masculino',null,true,false,null),
('Marlon Galeno',18,55.00,'Azul','Adulto','Masculino',null,true,false,null),
('Felipe Emanuel',20,66.00,'Azul','Adulto','Masculino',null,true,false,null),
('Giovanne Kennedy',18,60.00,'Branca','Adulto','Masculino',null,true,true,'Confirmar participação no No-Gi.'),
('Luis Gabriel de Souza Rodrigues',16,64.00,'Branca','Juvenil','Masculino',null,false,true,null),
('Andrea Batista',10,51.00,'Branca','Infantil','Feminino',null,true,false,null),
('Paola Cristini',14,66.00,'Branca','Infantil','Feminino',null,true,false,null),
('Luiz Gustavo da Silva Nogueira',14,80.00,'Branca','Infantil','Masculino',null,true,false,null),
('Abraão Moraes',16,99.00,'Branca','Juvenil','Masculino',null,false,true,null),
('Luiz Castro',43,75.00,'Marrom','Master','Masculino',null,true,false,null),
('Pedrinho Pantoja',34,72.00,'Azul','Adulto','Masculino',null,true,false,null)
) as v(name,age,weight,belt,category,gender,academy,gi,nogi,notes)
where not exists (select 1 from public.athletes a where lower(a.name)=lower(v.name));

-- As dez lutas propostas, sem duplicar confrontos já existentes.
insert into public.fights (athlete_a_id,athlete_b_id,modality,fight_style,status,notes)
select a.id,b.id,v.modality,'Regras do Evento','scheduled',v.notes
from (values
('Miguel Lovato','Ryan Emanoel','gi',null),
('Vitoria Queiroz','Maria Lovato','gi',null),
('Henrique Ferreira','Gabriel Jesus','gi',null),
('Luan Ferreira','Gabriell Cassiano','gi',null),
('Heitor da Silva Santos','João Miguel da Silva Seixas','gi','Diferença de 3 anos e 4,3 kg confirmada pelo organizador.'),
('Andrya Batista','Maria Clara','gi',null),
('Ana Gabriely Santos Silva','Sophia dos Santos Pimentel','gi','Confirmar a faixa de Ana Gabriely.'),
('Lorenzo Cabeça','Ryan da Silva Morais','gi',null),
('Marlon Galeno','Felipe Emanuel','gi','Diferença de 11 kg confirmada pelo organizador.'),
('Giovanne Kennedy','Luis Gabriel de Souza Rodrigues','nogi','Confirmar participação de Giovanne no No-Gi.')
) as v(name_a,name_b,modality,notes)
join public.athletes a on lower(a.name)=lower(v.name_a)
join public.athletes b on lower(b.name)=lower(v.name_b)
where not exists (
  select 1 from public.fights f
  where (f.athlete_a_id=a.id and f.athlete_b_id=b.id)
     or (f.athlete_a_id=b.id and f.athlete_b_id=a.id)
);
