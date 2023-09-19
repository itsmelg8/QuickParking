const pool = require('../conexao');

const veiculoReserva = async (req, res) => {
    const { placa, horario } = req.body;
    
    if (!placa) {
        return res.status(401).json({ mensagem: 'O campo placa não foi informado!'});
    };

    if (!horario) {
        return res.status(401).json({ mensagem: 'O campo horario não foi informado!'});
    };

    try {
        const veiculo = await pool.query(
			'select * from veiculo where placa = $1',
			[placa]
		);

		if (veiculo.rowCount < 1) {
			return res.status(404).json({ mensagem: 'Placa invalida' });
		};

		const novoVeiculo = await pool.query(
			'insert into reserva (placa, horario) values ($1, $2) returning *',
			[placa, horario]
		);

		return res.status(201).json(novoVeiculo.rows[0]);

	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno do servidor' });
	};
};

module.exports = veiculoReserva;