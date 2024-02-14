<?php

namespace App\Http\Controllers;

use App\Http\Resources\StatusResource;
use App\Models\Status;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class StatusController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return StatusResource::collection(Status::query()->get());
    }
}
