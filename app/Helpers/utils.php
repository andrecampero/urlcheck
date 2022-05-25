<?php

function generateTrack($param = null){
    $date = new Carbon\Carbon();
    $filterDate =  preg_replace('/[^\d]/', '', $date);
    $filterDate = "{$param}{$filterDate}";

    return $filterDate;
}



