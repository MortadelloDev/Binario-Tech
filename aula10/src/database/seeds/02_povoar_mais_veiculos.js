exports.seed = async function(knex) {
  // Insere novos veiculos de teste
  const [v3] = await knex('veiculos').insert({ placa: 'MBZ-3030', montadora: 'Mercedes-Benz', modelo: 'Actros' });
  const [v4] = await knex('veiculos').insert({ placa: 'DAF-4040', montadora: 'DAF', modelo: 'XF' });
};