<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TbTrack;
use Auth;
use App\Models\TbPerfil;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Yajra\Datatables\Datatables;
use Illuminate\Support\Facades\DB;


class ProtocolController extends Controller
{
    private $protocol;

    public function __construct(TbTrack $tb_track)
    {
        $this->tb_track = $tb_track;
    }

    public function index()
    {
        $title = "Protocolos";

        return view('protocols.index', compact('title'));
    }
	
    public function getProtocols()
    {
        $user_id = Auth::user()->id;
		
		$protocol = DB::select( DB::raw("
			SELECT 
				*
			FROM tb_track tt
			WHERE 1 = 1
			ORDER BY tt.id DESC		
		"));
		
        return Datatables::of($protocol)
            ->editColumn('urlcheckedAt', function ($protocol) {
                return $protocol->urlcheckedAt ? with(new Carbon($protocol->urlcheckedAt))->format('d/m/Y H:i:s') : '';
            })
            ->editColumn('createdAt', function ($protocol) {
                return $protocol->createdAt ? with(new Carbon($protocol->createdAt))->format('d/m/Y H:i:s') : '';
            })
            ->make(true);
    }

    public function createLot()
    {
        $title = "Lote Pré Impresso";

        return view('protocols.create-lot', compact('title'));
    }

    public function saveLot(Request $request)
    {
        $data = $request->except(['_token']);
        $dados = $request->all();
        $fields = new Request($data);
        $this->validate($fields, $this->tb_track->rulesLot, $this->tb_track->messages);

        $dados['createdBy'] = Auth::user()->id;
		$dados['status_code'] = "Validando...";
        $dados['createdAt'] = Carbon::now();
        $create = TbTrack::create($dados);

        if (!$create) {
            return response()->json(["result" => false, "message" => "Algo errado aconteceu, tente novamente mais tarde "]);
        }

		return response()->json(["result" => true, "message" => "Url cadastrada com sucesso!"]);

	}

}
