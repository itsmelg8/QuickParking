const pool = require('../conexao');

const horarioAtual = new Date();

const checkout = async (req, res) => {
    const { placa } = req.body;

	if (!placa) {
        return res.status(401).json({ mensagem: 'O campo placa não foi informado!'});
    };

    try {
		const placaVeiculo = 'select * from reserva where placa = $1'
		const placaExistente = await pool.query(placaVeiculo, [placa]);

		const horarioConsulta = 'select horario from reserva where placa = $1'
		const horarioEntrada = await pool.query(horarioConsulta, [placa]);


		if (placaExistente.rowCount < 1) {
			return res.status(400).json({ mensagem: 'Carro informado não está estacionado' });
		};

		const [dia, mes, ano, horas, minutos] = horarioEntrada.rows[0].horario.match(/\d+/g);

  		const dataHoraDesejada = new Date(ano, mes - 1, dia, horas, minutos);

  		const valorCobrado =  Math.floor(((horarioAtual - dataHoraDesejada) / 36e5) * 5);

        await pool.query('delete from reserva where placa = $1', [placa]);

        return res.json((valorCobrado / 100000).toFixed(2));

	} catch (error) {
		return res.status(500).json('Erro interno do servidor');
	};

};

module.exports = checkout;