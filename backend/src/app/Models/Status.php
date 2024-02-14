<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Ramsey\Collection\Collection;

/**
 * @property-read int $id
 * @property-read Collection $tasks
 */
class Status extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'color'
    ];

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

}
