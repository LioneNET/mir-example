<?php

namespace App\Http\Requests;

use App\Models\Status;
use Illuminate\Validation\Rule;

class TaskCreateRequest extends APIRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'text' => [
                'required',
                'min: 3'
            ],
            'status_id' => [
                'required',
                Rule::exists(Status::class, 'id')
            ]
        ];
    }
}
