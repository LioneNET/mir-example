<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskChangeStatusRequest;
use App\Http\Requests\TaskCreateRequest;
use App\Http\Requests\TaskUpdateRequest;
use App\Http\Resources\TaskResource;
use App\Models\Status;
use App\Models\Task;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class TaskController extends Controller
{
    public function index(Status $status): AnonymousResourceCollection
    {
        return TaskResource::collection(
            Task::query()
                ->whereRelation('status', 'status_id', '=', $status->id)
                ->orderBy('updated_at', 'desc')
                ->get()
        );
    }

    public function store(TaskCreateRequest $request): TaskResource
    {
        return TaskResource::make(Task::query()->create($request->validated()));
    }

    public function update(Task $task, TaskUpdateRequest $request): TaskResource
    {
        $task->update($request->validated());
        return TaskResource::make($task);
    }

    public function show(Task $task): TaskResource
    {
        return TaskResource::make($task);
    }

    public function destroy(Task $task): Response
    {
        $task->delete();
        return response('', ResponseAlias::HTTP_NO_CONTENT);
    }

    public function moveToStatus(Task $task, TaskChangeStatusRequest $request): TaskResource
    {
        $task->status_id = $request->status_id;
        $task->save();
        return TaskResource::make($task);
    }
}
