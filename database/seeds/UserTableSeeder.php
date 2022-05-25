<?php

use Illuminate\Database\Seeder;
use App\Models\TbUsuario;
class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TbUsuario::create([
            'email' => 'teste@dev.com',
            'senha' => bcrypt('12345'),
            'nome' => 'Dev',
            'local' => 'Berrini',
            'numero' => '1681',
            'andar' => '9',
            'bairro' => 'Novo Brooklin',
            'cidade' => 'São Paulo',
            'cep' => '0000-000',
            'uf' => 'SP',
            'area' => 'Dev',
            'ramal' => '63 61',
            'centro_custo' => '0000001',
            'first' => 1,
            'perfil' => 1,
            'ativo' => 1,
            'confirmado' => 1,
            'nome_local' => 'Berrini',
            'conf' => 0,
            'empresa' => 'PitneyBowes'
        ]);
    }
}
