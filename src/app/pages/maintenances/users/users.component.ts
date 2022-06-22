import { Component, OnDestroy, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

import { Usuario } from 'src/app/models/usuario.model';

import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  public from: number = 0;
  public total: number = 0;
  public cargando: boolean = true;
  public usuarios: Usuario[] = [];

  private subscriptions = new Subscription();;

  constructor(private as: AuthService, private us: UsuarioService, private bs: BusquedasService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private cargarUsuarios() {
    this.cargando = true;
    const sub = this.us.listarUsuarios(this.from)
      .subscribe({
        next: ({ usuarios, total }) => {
          this.total = total;
          this.cargando = false;
          this.usuarios = usuarios;
        },
        error: e => console.error(e),
        complete: () => console.info('Lista recuperada')
      });
    this.subscriptions.add(sub);
  }

  public buscar(query: string) {
    this.cargando = true;
    if (query) {
      this.bs.buscar(query, 'usuarios')
        .subscribe({
          next: resultados => {
            this.cargando = false;
            console.log(resultados);
            this.usuarios = resultados;
          },
          error: e => console.error(e),
          complete: () => console.info('Busqueda completada')
        });
    } else {
      this.cargarUsuarios();
    }
  }

  public borrar(usuario: Usuario) {
    if (usuario.uid === this.as.usuario.uid) return;

    Swal.fire({
      title: '¿Esta seguro?',
      text: `Estas a punto de eliminar a ${usuario.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.us.eliminarUsuario(usuario.uid!)
          .subscribe({
            next: () => {
              this.cargarUsuarios();
              Swal.fire(
                '¡Eliminado!',
                `El usuario ${usuario.name} ha sido eliminado`,
                'success'
              );
            },
            error: e => console.error(e),
            complete: () => console.info('Operacion completada')
          });
      }
    })
  }

  public changeValue(value: number): void {
    this.from += value;
    if (this.from < 0)
      this.from = 0;
    else if (this.from > this.total)
      this.from -= value;

    this.cargarUsuarios();
  }

  public get usuarioActual() {
    return this.as.usuario;
  }

}
