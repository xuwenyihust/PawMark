from flask import Blueprint, jsonify, request
from app.services.kernel import Kernel
import logging

kernel_blueprint = Blueprint('kernel', __name__)

logging.basicConfig(level=logging.INFO)

@kernel_blueprint.route('/kernel/<path:kernel_id>', methods=['GET'])
def get_kernel_by_id(kernel_id):
  logging.info(f"Getting kernel with id: {kernel_id}")
  return Kernel.get_kernel_by_id(kernel_id)

@kernel_blueprint.route('/kernel/restart/<path:kernel_id>', methods=['POST'])
def restart_kernel(kernel_id):
  logging.info(f"Restarting kernel with id: {kernel_id}")
  return Kernel.restart_kernel(kernel_id)
