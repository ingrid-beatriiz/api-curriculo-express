const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const Curriculo = require('./models/Curriculo');
const Experiencia = require('./models/Experiencia');
const routes = require('./routes/routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('API do Currículo rodando com sucesso no Vercel!');
});

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(async () => {
    console.log('✅ Banco de dados sincronizado!');
    
    const contagem = await Curriculo.count();
    if (contagem === 0) {
      await Curriculo.bulkCreate([
        { 
          nome: 'Ingrid Beatriz Silva', 
          email: 'ingrid.beatriz@email.com', 
          resumo: 'Estudante de Sistemas para Internet e estagiária em programação na tribo de investimentos.' 
        },
        { 
          nome: 'Eduardo Oliveira', 
          email: 'eduardo.techlead@email.com', 
          resumo: 'Desenvolvedor Sênior com vasta experiência em arquitetura de software e liderança técnica.' 
        }
      ]);
      console.log('✅ Currículos iniciais cadastrados!');
    }
  })
  .catch(err => {
    console.error('❌ Erro de conexão com o banco:', err);
  });

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;